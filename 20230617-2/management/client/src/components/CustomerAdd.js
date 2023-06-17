import React from 'react';
import axios from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((res) => {
                console.log(res.data);
                // 전체 페이지 리로딩만 되는 것이 아닌, 고객 정보 조회 페이지만 리로딩 됨.
                // 비동기적으로 처리
                this.props.stateRefresh();
            })
        // 빠른 테스트를 위해 작성. 실제로는 이렇게 쓰면 안 됨.
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
    }
    
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <form onSubmit={ this.handleFormSubmit }>
                <h1>고객 추가</h1>
                프로필 이미지: <input type='file' name='file' file={ this.state.file } value={ this.state.fileName } onChange={ this.handleFileChange } /><br />
                이름: <input type='text' name='userName' value={ this.state.userName } onChange={ this.handleValueChange } /><br />
                생년월일: <input type='text' name='birthday' value={ this.state.birthday } onChange={ this.handleValueChange } /><br />
                성별: <input type='text' name='gender' value={ this.state.gender } onChange={ this.handleValueChange } /><br />
                직업: <input type='text' name='job' value={ this.state.job } onChange={ this.handleValueChange } /><br />
                <button type='submit'>추가하기</button>
            </form>
        )
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config);;
    }

}

export default CustomerAdd;