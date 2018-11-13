import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import { Link } from 'react-router-dom';

class PostsIndex extends Component {
	//will be called as soon the component on render shown at DOM
	//is one of lifecycle method of react component class(otomatically called by react after component shown at dom)
	componentDidMount() {
		this.props.fetchPosts(); //kickoff data loading cycle
	}


	renderPosts() {
		console.log(this.props.posts);
		return _.map(this.props.posts, post => {
			return (
	
					<li key={post.id} className="list-group-item">
						<Link to={ `/posts/${post.id}` }>
						{post.title}
						</Link>
					</li>

			);
		});
		

	}


	render() {
		console.log(this.props.posts);
		return (
			<div>
				<div className="text-xs-right">
					<Link className="btn btn-primary" to="/posts/new" >
					Add a Post
					</Link>
				</div>
				<div>
					<h3> Posts </h3>
					<ul className="list-group" >
					{this.renderPosts()}
					</ul>
				</div>
			</div>
		);
	}
}

//if we want to consume anything from application level state
function mapStateToProps(state) {
	return {posts: state.posts};
}

//define mapsStateToProps = null //not passing mapStateToProps //blank page
export default connect(mapStateToProps, {fetchPosts:fetchPosts})(PostsIndex);