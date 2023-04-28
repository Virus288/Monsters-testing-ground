import Communicator from './communication/views/Component';
import FourOhFour from './generic/views/FourOhFour';
import Navbar from './generic/views/Navbar';
import GetMessages from './get/views/Messages';
import GetRawMessages from './get/views/RawMessages';
import SendMessages from './send/views/Messages';
import SendRawMessages from './send/views/RawMessages';
import Settings from './settings/views/Component';

const Components = {
  Navbar,
  Settings,
  SendRawMessages,
  SendMessages,
  GetRawMessages,
  GetMessages,
  FourOhFour,
  Communicator,
};

export default Components;
