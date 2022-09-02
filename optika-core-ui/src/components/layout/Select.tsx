import React, {Component} from 'react';
import {FieldRenderProps} from 'react-final-form';
import {Dropdown, DropdownItemProps, DropdownProps, Form} from 'semantic-ui-react';
import styled from 'styled-components';
import {DropdownOption} from "../utils/coreUtils";

export const PxDropdownSc = styled(Dropdown)`

  &.ui.selection.dropdown {
    min-height: 29px;
    //max-height: 30px;
    padding: 5px;
  }

  &.ui.selection.dropdown>.dropdown.icon {
    top: 60%;
    padding: 0 10px;
  }

  &.ui.search.dropdown>.text {
    line-height: 1.21428571em;
  }

  &.ui.search.dropdown .menu {
    max-height: 19.028571rem;
  }

  &.ui.multiple.dropdown>.label {
    margin: 5px 3px;
  }

  &.ui.search.dropdown>input.search {
    padding: 5px;
    margin: 0;
  }

`;

export interface FinalFormSelectProps extends FieldRenderProps, DropdownProps {
    openOnFocus?: boolean,
    remoteSearch?: boolean,
    customRemoteSearchMethod?: (search: string) => void,
    remoteSearchMethod?: (search: string) => Promise<Array<any>>,
    searchResultToOptionMapper?: (options: Array<any>) => Array<DropdownOption>,
    onNewAddition?: (addition: DropdownOption) => void,
    customOnChange?: (value: any) => void
}

interface State {
    options: Array<DropdownItemProps>
}

class FinalFormSelectUI extends Component<FinalFormSelectProps, State> {

    constructor(props: FinalFormSelectProps) {
        super(props);

        const {options = []} = props;

        this.state = {
            options: options
        }
    }

    componentDidUpdate(
        prevProps: Readonly<FinalFormSelectProps>,
        prevState: Readonly<State>, snapshot?: any
    ): void {

        const {options: optionsProps = []} = this.props;
        const {options: prevOptions = []} = prevProps;

        if ((prevOptions !== optionsProps && optionsProps.length !== 0 && prevOptions.length !== 0)
            || prevOptions.length !== optionsProps.length) {
            this.setState({
                options: optionsProps
            });
        }
    }
    ;

    onValueChange = (event: React.SyntheticEvent<HTMLElement>, {value}: DropdownProps) => {

        const {input, remoteSearch, clearable, customOnChange} = this.props;

        if (remoteSearch && clearable && !value) {
            this.setState({
                options: []
            })
        }

        input.onChange(value);
        if (customOnChange) {
            customOnChange(value);
        }
    };

    removeAutoCompleteOnFocus = (e: any) => {
        e.target.setAttribute("autocomplete", "nope");
    };

    customSearch = (options: Array<DropdownItemProps>): Array<DropdownItemProps> => {

        const {allowAdditions} = this.props;

        if (allowAdditions) {
            return options.filter(option => {
                return option.key !== "addition";
            });
        }

        return options;
    };

    onNewAddition = (e: any, {value}: any): void => {

        const {onNewAddition} = this.props;

        const newAddition = {
            key: value,
            text: value.toString(),
            value: value
        };

        if (onNewAddition) {
            onNewAddition(newAddition);
        }

        this.setState({
            options: [newAddition, ...this.state.options]
        });
    };

    render(): React.ReactNode {

        const {
            meta,
            input,
            allowAdditions,
            search,
            remoteSearch,
            remoteSearchMethod,
            customRemoteSearchMethod,
            searchResultToOptionMapper,
            automaticAddingOfValue,
            automaticAdditionMapper,
            getMessage,
            getMessageWithNamedParams,
            multiple,
            onNewAddition,
            openOnFocus = true,
            ...restProps
        } = this.props;

        const {options} = this.state;
        const value = multiple && input.value === "" ? [] : input.value;

        return (
            <Form.Field className={`${this.props.className}`}>
                <>
                    <PxDropdownSc
                        error={!!(meta.touched && meta.error)}
                        selection
                        value={value}
                        onChange={this.onValueChange}
                        onFocus={this.removeAutoCompleteOnFocus}
                        multiple={!!multiple}
                        search={remoteSearch ? this.customSearch : true}
                        allowAdditions={allowAdditions}
                        onAddItem={allowAdditions ? this.onNewAddition : undefined}
                        options={options}
                        openOnFocus={openOnFocus}
                    />
                    {this.props.children}
                </>
            </Form.Field>
        )
    }

}

const FinalFormSelect = (FinalFormSelectUI);
export default FinalFormSelect;
