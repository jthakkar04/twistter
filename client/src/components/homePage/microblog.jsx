// Dependencies
import React from 'react';

export class microBlog extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    render() {

        return (
            <h2>hi</h2>
            // <div>
            //     <div>
            //         <ul class="flex-container column">
            //             <li class="flex-item">1</li>
            //             <li class="flex-item">2</li>
            //             <li class="flex-item">3</li>
            //             <li class="flex-item">4</li>
            //             <li class="flex-item">5</li>
            //         </ul>
            //     </div>
            // </div>

        );
    }
}

