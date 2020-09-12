import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject: {title:'WEB', sub:'World Wid Web!!'},
      welcome: {title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
        ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }
  render() {
    console.log('App render');
    var _title, _desc, _article, _content = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      console.log('read', this.state.contents.length);
      //_title = this.state.contents[0].title;
      //_desc = this.state.contents[0].desc;
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        console.log(data.id, this.state.selected_content_id);
        if(data.id === Number(this.state.selected_content_id)) {
          
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        //add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );//original contents state을 바꾸는 것이라 성능개선에 좋지 않음
        
        //var _contents= this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});//원본 데이터 수정 없이 이방법을 쓰는 것이 성능 개선에 좋다
        
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        
        this.setState({contents:_contents, mode: 'read', selected_content_id:this.max_content_id});
        console.log(_title, _desc)
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
      function(_id, _title, desc){
        var _contents = Array.from(this.state.contents);// immutable 테크닉
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:desc};
            break;
          }
          i = i + 1;
        }

        this.setState({
          contents: _contents,
          mode:'read'
        });
        console.log(_id, _title, _desc);
      }.bind(this)}
      ></UpdateContent>
    }
    
    return (
      <div className="App"> 
          <Subject title={this.state.subject.title} sub={this.state.subject.sub}
          onChangePage={function(){
          this.setState({mode:'welcome'});
          }.bind(this)}
          ></Subject>

          <TOC 
          onChangePage={function(id){
            this.setState({mode:'read', selected_content_id:id});
          }.bind(this)}
          data={this.state.contents}></TOC>
          <Control onChangeMode={function(_mode){
          
          if(_mode === 'delete'){
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length){
              //console.log("delete logic", _contents[i].id, this.state.selected_content_id);
                if(_contents[i].id == this.state.selected_content_id){
                  _contents.splice(i, 1);
                  //console.log('deleted!');
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
          }
          else {
            this.setState({
              mode: _mode
            })
          }
            
          }.bind(this)}></Control>
          {_article}
      </div>
    );
  }
  
}

export default App;
