import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd'
import { createTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

// 개발 환경은 다음과 같습니다.
// React / React-dom v17.0.0
// testing-library/react v12.1.5
// Material-UI v4.12.4

const theme = createTheme();

const styles = {
  root: {
    width: "100%",
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
};

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }

  // 초기화
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    // 사용자가 검색한 이름이 포함되어 있다면, 그 데이터만을 남겨둘 수 있게 하기.
    const filteredComponents = (data) => {
      data = data.filter((c) => {
          return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer key={ c.id } stateRefresh={ this.stateRefresh }  id={ c.id } image={ c.image } name={ c.name } birthday={ c.birthday } gender={ c.gender } job={ c.job } />
      });
    }

    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];

    return (
      <div className={ classes.root }>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={ classes.menuButton } color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={ classes.title } variant="h6" color="inherit" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={ classes.grow }  />
            <div className={ classes.search }>
              <div className={ classes.searchIcon }>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name='searchKeyword'
                value={ this.state.searchKeyword }
                onChange={ this.handleValueChange }
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={ classes.menu }>
          <CustomerAdd stateRefresh={ this.stateRefresh } />
        </div>
        <Paper className={ classes.paper }>
          <Table className={ classes.table }>
            <TableHead>
              <TableRow>
                { cellList.map((c, index) => {
                  return <TableCell key={ index } className={ classes.tableHead }>
                    { c }
                  </TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.customers ? 
                filteredComponents(this.state.customers) : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress
                      className={ classes.progress }
                      variant="determinate"
                      value={ this.state.completed }
                    />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);