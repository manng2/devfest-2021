import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router-dom';
import navbarItem from '../../types/navbarItem';

const items: navbarItem[] = [
  {
    name: 'Home',
    value: 'home',
    path: '/'
  },
  {
    name: 'About',
    value: 'about',
    path: '/about'
  }
]

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);

    history.push(items[newValue].path);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {items.map((item, index) => {
            return (
              <Tab label={item.name} {...a11yProps(index)} key={index} />
            )
          })}
        </Tabs>
      </AppBar>
    </div>
  );
}
