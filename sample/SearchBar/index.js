/**
 * Created by zhangyi on 2017/10/25.
 */
import React, { Component } from 'react'
import { SearchBar } from '../../components'

export default class SearchDemo extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <SearchBar
                    onSubmit={()=>{ console.log('onSubmit') }}
                    onChange={(value)=>{ console.log('onChange value:', value) }}
                    onFocus={()=>{ console.log('onFocus') }}
                    onBlur={()=>{ console.log('onBlur') }}
                    onCancel={(value)=>{ console.log('onCancel value:', value) }}
                    onClear={()=>{ console.log('onClear') }}/>

                {/*<div>*/}
                    {/*<SearchLoading/>*/}
                {/*</div>*/}
            </div>
        )
    }
}
