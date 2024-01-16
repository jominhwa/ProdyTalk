import React, { Component } from 'react';
import '../css/Filter.css';

class VideoFilter extends Component {
    constructor(props) {
        super(props);

   }
    childFunction = (uri) => {
       this.props.parentsFunc(uri);
    }
    render() {

        const { open, header } = this.props;
        return (
              <div className={open ? 'openModal modal' : 'modal'}>
                {open ? (
                  <section>
                    <header>
                      {header}
                    </header>
                    <main>
                    <button onClick={() => this.childFunction()}>
                        <img
                              src="https://cdn.pixabay.com/photo/2013/07/13/09/51/unauthorised-156169_960_720.png"
                              alt="new"
                        />
                      </button>
                      <button onClick={() => this.childFunction('https://cdn.pixabay.com/photo/2017/09/30/09/29/cowboy-hat-2801582_960_720.png')}>
                        <img
                              src="https://cdn.pixabay.com/photo/2017/09/30/09/29/cowboy-hat-2801582_960_720.png"
                              alt="new"
                        />
                      </button>
                      <button onClick={() => this.childFunction('https://cdn.pixabay.com/photo/2015/12/11/06/37/santa-hat-1087709_960_720.png')}>
                        <img
                              src="https://cdn.pixabay.com/photo/2015/12/11/06/37/santa-hat-1087709_960_720.png"
                              alt="new"
                        />
                      </button>
                      <button onClick={() => this.childFunction('https://cdn.pixabay.com/photo/2014/12/21/23/52/crown-576226_960_720.png')}>
                        <img
                              src="https://cdn.pixabay.com/photo/2014/12/21/23/52/crown-576226_960_720.png"
                              alt="new"
                        />
                      </button>
                    </main>
                    <footer>
                      <button className="apply">
                        적용
                      </button>
                  </footer>
                  </section>
                ) : null}
              </div>
            );
          }
        }
export default VideoFilter;