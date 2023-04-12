import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';


const rows = [
  {name:'Frozen yoghurt', calories:159, fat:6.0, carbs:24, protein:4.0},
 {name:'Ice cream sandwich', calories:237, fat:9.0, carbs:37, protein:4.3},
  {name:'Eclair', calories:262, fat:16.0, carbs:24, protein:6.0},
  {name:'Eclair', calories:262, fat:16.0, carbs:24, protein:6.0},
];

const TableData=(({})=>{
const [rows, setRows] = useState("");
const [loading, setLoading] = useState(true);
    const getData = async () => {
        const resp = await fetch('https://api.sampleapis.com/countries/countries');
        const json = await resp.json();
        console.log("setRows", json)
        setRows(json);
        setLoading(false)
      }
    
      useEffect(() => {
        getData();
      }, []);

  return (
    <TableContainer align="center" component={Paper}>
    {loading?
          <Typography sx={{ mt: 3, mb: 2, textAlign: 'center', color:'#00272a' }}> <h3>Please wait...</h3> </Typography>
          :
      <Table sx={{ width: 950, maxHeight:"50mh", overflow:"scroll" }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Flag</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Capital</TableCell>
            <TableCell align="left">Currency</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Population</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">
              <CardMedia
                    component="img"
                    height="40"
                    width="40"
                    image={row.media.flag}
                    alt={row.name}
                    sx={{py:1}}
                />
              </TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell align="left">{row.capital}</TableCell>
              <TableCell align="left">{row.currency}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="left">{row.population}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    }
    </TableContainer>
  );
})

export default TableData;

