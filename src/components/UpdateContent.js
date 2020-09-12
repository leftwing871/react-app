import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value});//[] <-- 문법 확인
  }
  render() {
    console.log(this.props.data);
    console.log('UpdateContent render');
    return (
        <article>
            <h2>Create</h2>
            <form action="/update_process" method="post"             
            onSubmit={function(e){
              e.preventDefault();

              this.props.onSubmit(
/*              e.target.title.value
              , e.target.desc.value*/
              this.state.id,
              this.state.title,
              this.state.desc
              );

            }.bind(this)}>
              <p><input 
              type="text" 
              name="title" 
              placeholder="title"
              /*value={this.props.data.title}*/
              value={this.state.title}
              // onChange={function(e){
              //   this.setState({title:e.target.value});
              // }.bind(this)}
              onChange={this.inputFormHandler}
              ></input></p>
              <input type="hidden" name="id" value={this.state.id}></input>
              <p>
                <textarea name="desc" placeholder="description" 
                placeholder="description"
                value={this.state.desc} 
              //   onChange={function(e){
              //   this.setState({desc:e.target.value});
              // }.bind(this)}
              onChange={this.inputFormHandler}
              ></textarea>//react는 유사 html을 사용한다.
              </p>
              <p>
                <input type="submit"></input>
              </p>
            </form>
        </article>
    );
  }
}

export default UpdateContent;

