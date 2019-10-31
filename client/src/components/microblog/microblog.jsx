// Dependencies
import React from 'react';
import { Link, withRouter } from "react-router-dom";

// Project dependencies
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';

// export const MicroBlogPage = (data) => (
//     <div>
//          <MicroBlogForm />
//     </div>
// );

// export class MicroBlogBase extends React.Component {
export class MicroBlog extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            // data: this.props.data
        }
    }

    render() {

        return (
            <div>
                {/* {console.log(this.props.data)} */}
                {/* <h2>{this.props.data}</h2> */}
                <div>
                    {/* <ul class="flex-container column"> */}
                        <li class="flex-item">{this.props.data}</li>
                        {/* <li class="flex-item">2</li>
                        <li class="flex-item">3</li>
                        <li class="flex-item">4</li>
                        <li class="flex-item">5</li> */}
                    {/* </ul> */}
                </div>
            </div>

        );
    }
}

// export const MicroBlogForm = withRouter(withFirebase(MicroBlogBase));
// export const MicroBlogBase = withRouter(withFirebase(MicroBlogBase));