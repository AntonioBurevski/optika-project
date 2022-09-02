import * as React from 'react';
import Dropzone, { DropEvent, DropzoneProps } from "react-dropzone";
import styled from 'styled-components';

const TEN_MEGA_BYTES = 10485760;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  cursor: pointer;
  height: 60px;
`;

const getColor = (props: any) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive || props.isFileDialogActive) {
        return '#2196f3';
    }
    return '#eeeeee';
};

interface Props extends DropzoneProps {
    message?: string;
    isImage?: boolean;
    imageContentBase64?: string;
    imageFileType?: string;
}

interface State {
    imageUrl?: string;
}

class DropZone extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {}
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrop(acceptedFiles: File[], event: DropEvent) {
        if (this.props.isImage && acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            this.setState(prevState => {
                if (prevState.imageUrl) {
                    URL.revokeObjectURL(prevState.imageUrl);
                }
                const previewImageUrl = URL.createObjectURL(file);
                return {
                    imageUrl: previewImageUrl
                }
            });
        }
        if (this.props.onDropAccepted) {
            this.props.onDropAccepted(acceptedFiles, event);
        }
    }

    componentWillUnmount() {
        if (this.state.imageUrl) {
            URL.revokeObjectURL(this.state.imageUrl);
        }
    }

    render(): React.ReactNode {
        const {message, isImage = false, maxSize = TEN_MEGA_BYTES, onDropAccepted, ...restProps} = this.props;
        const renderImage = () => {
            if (isImage) {
                if (this.state.imageUrl) {
                    return <img height="60px" src={this.state.imageUrl} alt={message}/>
                } else if (this.props.imageContentBase64) {
                    return <img height="60px" src={`data:${this.props.imageFileType};base64, ${this.props.imageContentBase64}`} alt={message}/>
                } else {
                    return <p>{message}</p>
                }
            } else {
                return <p>{message}</p>
            }
        }

        return (
            <Dropzone maxSize={maxSize} onDropAccepted={this.handleDrop} {...restProps}>
                {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                      isDragAccept,
                      isDragReject,
                      isFileDialogActive
                  }) => (
                    <Container
                        {...getRootProps({
                            isDragActive, isDragAccept,
                            isDragReject, isFileDialogActive
                        })}
                    >
                        <input {...getInputProps()} />
                        {renderImage()}
                    </Container>
                )}
            </Dropzone>
        );
    }
}

export default DropZone;


