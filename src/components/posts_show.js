import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost,deletePost } from '../actions'; 


import { Link } from 'react-router-dom';

class PostsShow extends Component {

	componentDidMount() {
	//IF NOT WANT TO RE-FETCH SHOW FROM INDEX
	//TO REMOVE IF WANT TO NEW STATE DATA FOR SHOW (2 x FETCH)	
		if (!this.props.post) {
		//get the id from url
		//define as :id the Route index.js
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
		}	


	}

	onDeleteClick() {
		const { id } = this.props.match.params;
		//DO NOT USE this.props.post.id as this comp already rendered without post being avalable
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { post } = this.props;

		if ( !post) {
			return <div> loading... </div>
		}

		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}
				>
				Delete Posts
				</button>
				<h3>{post.title}</h3>
				<h6>Categories : {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}

}

//destructuring to only get posts on state
//receive second argument, by convention "ownProps"
//ownProps is the props object that are going to the compoenent
function mapStateToProps({ posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);