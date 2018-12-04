import io from 'socket.io-client';
import store, {getMessage} from './store'

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  socket.on('new-message', (message) => {
    console.log('received massage from the server', message)
    console.log('do I have store?', store)
    store.dispatch(getMessage(message));
  })
});


export default socket;
