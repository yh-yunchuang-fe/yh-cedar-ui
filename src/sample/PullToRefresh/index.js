import React, { Component } from 'react'
import { PullToRefresh } from '../../components/'

export default class PullToRefershDemo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            refreshing: false,
            loading: false,
            hasMore: true,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        }
    }

    componentDidMount() {

    }

    onLoadMore() {
        this.setState({
            loading: true
        })
    }

    onRefresh() {
        console.log('refresh')
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            this.setState({
                refreshing: false
            })
        }, 2000)
    }

    render() {
        const {
            refreshing,
            hasMore,
            loading,
            data
        } = this.state
        return  <PullToRefresh
                    refreshing={refreshing}
                    loading={loading}
                    hasMore={hasMore}
                    onLoadMore={this.onLoadMore.bind(this)}
                    onRefresh={this.onRefresh.bind(this)}
                >
            <div>
                {data.map(item => <p key={item} style={{height: '50px'}}>{item}</p>)}
            </div>
        </PullToRefresh>
    }
}