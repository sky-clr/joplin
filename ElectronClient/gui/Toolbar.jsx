const React = require('react');
const { connect } = require('react-redux');
const { themeStyle } = require('lib/theme');
const ToolbarButton = require('./ToolbarButton.min.js');
const ToolbarSpace = require('./ToolbarSpace.min.js');
const ToggleEditorsButton = require('./ToggleEditorsButton/ToggleEditorsButton.js').default;

class ToolbarComponent extends React.Component {
	render() {
		const theme = themeStyle(this.props.theme);

		const style = Object.assign({
			// height: theme.toolbarHeight,
			display: 'flex',
			flexDirection: 'row',
			// borderBottom: `1px solid ${theme.dividerColor}`,
			boxSizing: 'border-box',
			paddingRight: 6,
			backgroundColor: theme.backgroundColor3,
		}, this.props.style);

		const groupStyle = {
			display: 'flex',
			flexDirection: 'row',
			boxSizing: 'border-box',
		};

		const leftItemComps = [];
		const centerItemComps = [];
		const rightItemComps = [];

		if (this.props.items) {
			for (let i = 0; i < this.props.items.length; i++) {
				const o = this.props.items[i];
				let key = o.iconName ? o.iconName : '';
				key += o.title ? o.title : '';
				const itemType = !('type' in o) ? 'button' : o.type;

				if (!key) key = `${o.type}_${i}`;

				const props = Object.assign(
					{
						key: key,
						theme: this.props.theme,
					},
					o
				);

				if (this.props.disabled) props.disabled = true;

				if (o.name === 'toggleEditors') {
					rightItemComps.push(<ToggleEditorsButton
						key={o.name}
						value={'markdown'}
						theme={this.props.theme}
						toolbarButtonInfo={o}
					/>);
				} else if (itemType === 'button') {
					const target = ['historyForward', 'historyBackward', 'startExternalEditing'].includes(o.name) ? leftItemComps : centerItemComps;
					target.push(<ToolbarButton {...props} />);
				} else if (itemType === 'separator') {
					centerItemComps.push(<ToolbarSpace {...props} />);
				}
			}
		}

		return (
			<div className="editor-toolbar" style={style}>
				<div style={groupStyle}>
					{leftItemComps}
				</div>
				<div style={groupStyle}>
					{centerItemComps}
				</div>
				<div style={Object.assign({}, groupStyle, { flex: 1, justifyContent: 'flex-end' })}>
					{rightItemComps}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { theme: state.settings.theme };
};

const Toolbar = connect(mapStateToProps)(ToolbarComponent);

module.exports = Toolbar;
