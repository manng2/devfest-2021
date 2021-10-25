import AboutPage from '../components/About';
import HomePage from '../components/Home';
import StartPage from '../components/Start';
import IRoute from '../types/routes';
import CreateRoom from './CreateRoom';
import Room from './Room';
import Container from '../components/Container';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Main',
    component: StartPage,
    exact: true
  },
  {
    path: '/workspace/:workspaceId',
    name: 'Home Page',
    component: HomePage,
    exact: true
  },
  {
    path: '/about',
    name: 'About Page',
    component: AboutPage,
    exact: true
  },
  {
    path: '/create/room',
    name: 'Create Room',
    component: CreateRoom,
    exact: true
  },
  {
    path: '/room/:roomID',
    name: 'Meeting',
    component: Room,
    exact: true
  },
  {
    path:'/room/:roomID/drawing',
    name: 'Whiteboard',
    component: Container,
    exact: true
  }
]

export default routes;
