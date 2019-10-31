// Dependencies
import React from 'react';
import microBlog  from './microblog';

export class FeedPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            redirectToReferrer: false,
        }
    }

    // Set state so it can be redirected if not logged in
    // state = {
    //     redirectToReferrer: false
    // }

    render() {
        const data = ['one', 'two', 'three']


        return (
            <div>
                <h1>Home Page</h1>
                <div>
                    < microBlog data={data} />
                    <ul class="flex-container column">
                        <li class="flex-item">1</li>
                        <li class="flex-item">2</li>
                        <li class="flex-item">3</li>
                        <li class="flex-item">4</li>
                        <li class="flex-item">5</li>
                    </ul>
                </div>
            </div>

        );
    }
}
