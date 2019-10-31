import React, { Component } from 'react'
import { PullToRefresh } from '../../components/'

export default class PullToRefershDemo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            refreshing: true,
            loading: false,
            hasMore: true,
            page: 0,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        }
    }

    componentDidMount() {
        this.setState({refreshing: true})

        setTimeout(() => {
            this.setState({refreshing: false})
        }, 1000)
    }

    onLoadMore() {
        const {page, data} = this.state

        if(page >= 1) {return}

        this.setState({
            loading: true
        })

        setTimeout(() => {
            this.setState({
                loading: false,
                page: 1,
                data: [...data, ...[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]]
            })
        }, 2000)
    }

    onRefresh() {

        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            this.setState({
                refreshing: false,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
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
                    refresh={false}
                    refreshing={refreshing}
                    loading={loading}
                    hasMore={hasMore}
                    onLoadMore={this.onLoadMore.bind(this)}
                    onRefresh={this.onRefresh.bind(this)}
                >
            <div>
                {data.map(item => <p key={item} style={{height: '50px', fontSize: 14}}>{item}</p>)}
            </div>
        </PullToRefresh>
    }
}