import React from 'react';
import InfiniteSurface from '../../../src/InfiniteSurface';
import InfiniteSurfaceWithDrop from '../../../src/InfiniteSurfaceWithDrop';
import GithubRibbon from '../GithubRibbon/GithubRibbon';

import './Example.scss';

export default class Example extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filesDropped: 0,
            overlay: {
                url: 'http://lorempixel.com/320/568',
                width: 380,
                height: 568,
                left: 0,
                top: 0,
                opacity: 0,
                show: true
            }
        }

        this.imageDrop = this.imageDrop.bind(this);
        this.loadOverlayFromFileDrop = this.loadOverlayFromFileDrop.bind(this);
    }

    log(message) {
        console.log(message, true);
    }

    loadOverlayFromFileDrop(file) {
        const image = new Image();
        image.src = file.preview;
        image.onload =  () =>  {

            let {width, height} = image;

            if (width > 1440) {
                width =  Math.round(width / 2);
                height =  Math.round(height / 2);
            }

            this.setState({
                overlay: {
                    url: file.preview,
                    width,
                    height,
                    left:0,
                    top:0,
                    opacity: 0.3,
                    show: true,
                }
            })
        }

    }

    imageDrop(data) {

        console.log(' -> ', data);

        if (data && data.files && data.files.length) {
            this.setState({
                filesDropped: data.files.length
            });

            this.loadOverlayFromFileDrop(data.files[0]);
        }
    }

    render() {
        const {filesDropped, overlay} = this.state;
        const {route} = this.props,
            {path} = route,
            isDrop = path === '/drop';

        const Canvas = isDrop ? InfiniteSurfaceWithDrop : InfiniteSurface;

        return (<div style={ styles.container } className="Example-container">

                <GithubRibbon />

                <Canvas
                    backgroundColor="#f3f3f3"
                    startingPosition={{x: 0, y: 0, zoom: 1.0}}
                    modeMoveEnter={() => this.log('modeMoveEnter')}
                    modeZoomEnter={() => this.log('modeZoomEnter')}
                    modeCleared={() => this.log('modeCleared')}
                    setZoom={(zoom) => this.log('setZoom = ' + zoom)}
                    didZoom={() => this.log('didZoom')}
                    willZoom={() => this.log('willZoom')}
                    imageDrop={this.imageDrop}
                    flex={true}
                    refreshSelector={() => this.log('refreshSelector')}
                    overlay={overlay}>
                    <div className="phone" id="phone">
                        <p>
                            <strong>to pan:</strong> space + click and drag
                        </p>
                        <p>
                            <strong>to zoom:</strong> hold "z" and click
                        </p>
                        <p>
                            <strong>to zoom out:</strong> hold "z" and right click or hold "alt+z" and click
                        </p>
                        {isDrop ? <p>Drag and drop files here</p> : null}
                        {filesDropped ? <p>{filesDropped} files dropped successfully</p> : null}
                    </div>
                </Canvas>

                <div className="star">
                    <a className="github-button" href="https://github.com/dht/infinite-surface" data-icon="octicon-star"
                       aria-label="Star ntkme/github-buttons on GitHub">Star</a>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
}