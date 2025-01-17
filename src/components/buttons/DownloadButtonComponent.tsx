import React, {Component} from 'react';

type Props = {
    downloadLink: string
    hidden: boolean
};


export class DownloadButtonComponent extends Component<Props, {}> {

    render() {
        return (
            <a href={this.props.downloadLink} hidden={this.props.hidden}
               target='_blank' rel='noopener noreferrer' >
                <button type="button" className="btn btn-success bmd-btn-fab">
                    <i className="material-icons">cloud_download</i>
                </button>
            </a>
        );
    }

}