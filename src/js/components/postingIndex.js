import React from 'react';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';

import * as apiActionCreators from '../actionCreators/apiActionCreators';
import PostingIndexItem from './postingIndexItem';
require("../../css/postingIndex.scss");

@connect(state => {
  return {
    postings: state.api.postings,
    page: state.api.page,
    postingsTotal: state.api.postingsTotal,
    postingsShown: state.api.postingsShown,
    searchInput: state.search.searchInput,
    totalPages: state.api.totalPages
  }
})

export default class PostingIndex extends React.Component {
  componentWillMount () {
    let { page, postings, searchInput, dispatch } = this.props;
    dispatch(
      apiActionCreators.fetchJobPostings(page, searchInput)
    ).then((action) => {
      let id = action.res.postings[0].id
      dispatch(apiActionCreators.fetchJobDetail(id))
    });
  }

  handleLoadNextPage() {
    let { page, totalPages, searchInput, dispatch } = this.props;
    if (page >= totalPages) { return; };
    if (page === totalPages ) { return; }

    dispatch(apiActionCreators.fetchJobPostings(page + 1, searchInput))
  }

  trimString(string, maxLength) {
    return string.length > maxLength ? string.substring(0, maxLength - 3) + "..." : string;
  }

  displayPostingItem (item) {
     return (
       <PostingIndexItem
         dispatch={this.props.dispatch}
         key={item.id}
         id={item.id}
         title={this.trimString(item.title, 50)}
         company={item.company}
         activity={item.time_ago}
         location={item.location}
         source={item.source} />
     )
  }

  render () {
    var { postings, page, postingsTotal, postingsShown } = this.props;

    return (
      <div id="job-postings-index">
        <p id="page-info">Showing <strong>{postingsShown}</strong> out of <strong>{postingsTotal}</strong> results</p>
        <Infinite elementHeight={86}
                  containerHeight={656}
                  infiniteLoadBeginEdgeOffset={150}
                  onInfiniteLoad={::this.handleLoadNextPage}>
          { postings.map(::this.displayPostingItem) }
        </Infinite>;
      </div>
    )
  }
}
