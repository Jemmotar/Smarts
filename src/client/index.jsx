import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';

class MyComponent extends React.Component {
	render () {
		return <Button
			content="Like"
			icon="heart"
			label={{ as: 'a', basic: true, content: '2,048' }}
			labelPosition="right"
    />;
	}
}

ReactDOM.render(<MyComponent />, document.getElementById('app'));
