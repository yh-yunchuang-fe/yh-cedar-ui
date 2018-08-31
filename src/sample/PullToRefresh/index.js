import React, { Component } from 'react'
import { PullToRefresh } from '../../components/'

export default class PullToRefershDemo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            refershing: true,
            loading: false,
            hasMore: true,
            data: [1, 2, 3, 4, 5, 6, ]
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                refershing: false
            })
        }, 3000)
        
    }

    onLoadMore() {
        this.setState({
            loading: true
        })
    }

    render() {
        const {
            refershing,
            hasMore,
            loading,
            data
        } = this.state
        return  <PullToRefresh
                    style={{flex: 1}}
                    refershing={refershing}
                    loading={loading}
                    hasMore={hasMore}
                    onLoadMore={this.onLoadMore.bind(this)}
                >
            <div>
                {data.map(item => <p key={item} style={{height: '50px'}}>{item}</p>)}
            </div>
        </PullToRefresh>
    }
}