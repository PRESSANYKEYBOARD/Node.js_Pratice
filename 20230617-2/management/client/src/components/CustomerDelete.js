import React from 'react';

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        // /api/customers/7
        // id 값에 해당되는 번호만 delete
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                this.props.stateRefresh();
            } else {
                throw new Error('고객 삭제에 실패했습니다.');
            }
        })
            .catch(error => {
            console.error(error);
        });
    }

    render() {
        return (
            <button onClick={(e) => { this.deleteCustomer(this.props.id) }}>삭제</button>
        )
    }

}

export default CustomerDelete;