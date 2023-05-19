import './App.css';
import Customer from './components/Customer';
import Table from '@mui/material';
import TableBody from '@mui/material';
import TableRow from '@mui/material';
import TableCell from '@mui/material';

const customers = [
  {
  'id': 1,
  'image': 'https://piaceimg.com/64/64/1',
  'name': '홍길동',
  'birthday': '951117',
  'gender': '남자',
  'job': '학생'
  },
  {
    'id': 2,
    'image': 'https://piaceimg.com/64/64/2',
    'name': '홍길동',
    'birthday': '960305',
    'gender': '남자',
    'job': '프로그래머'
  },
  {
    'id': 3,
    'image': 'https://piaceimg.com/64/64/3',
    'name': '이순신',
    'birthday': '921205',
    'gender': '남자',
    'job': '디자이너'
  },
]

function App() {
  return (
    <div>
      {
        customers.map( c => {
          return (
            <Customer
              id={ c.id }
              image= { c. id}
              name= { c.name }
              birthday={ c.birthday }
              gender={ c.gender }
              job={ c.job }
            />
          )
        })
      }
    </div>
  );
}

export default App;
