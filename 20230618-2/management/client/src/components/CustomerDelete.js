import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

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
          <div>
            <Button variant='contained' color='secondary' onClick={this.handleClickOpen}>삭제</Button>
            <Dialog open={ this.state.open } onClose={this.handleClose}>
              <DialogTitle onClose={this.handleClose}>
                삭제 경고
              </DialogTitle>
              <DialogContent>
                <Typography gutterBottom>
                  선택한 고객 정보가 삭제됩니다.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button variant='contained' color='primary' onClick={(e) => { this.deleteCustomer(this.props.id) }}>
                  확인
                </Button>
                <Button variant='outlined' color='primary' onClick={this.handleClose}>
                  취소
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }      
}

export default CustomerDelete;