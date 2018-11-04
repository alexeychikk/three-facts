import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { RootState } from '@store';

export type AuthDialogProps = {
	beforeApply?: () => any;
	beforeCancel?: () => any;
	beforeChange?: (value?: string) => any;
	mode?: 'change' | 'set';
	onApply?: () => any;
	onCancel?: () => any;
	onChange?: (value?: string) => any;
	open?: boolean;
	value?: string;
};

type AuthDialogState = {
	open: boolean;
	value: string;
};

export class AuthDialog extends React.Component<
	AuthDialogProps,
	AuthDialogState
> {
	static defaultProps = {
		beforeApply: () => {},
		beforeCancel: () => {},
		beforeChange: () => {},
		mode: 'set',
		onApply: () => {},
		onCancel: () => {},
		onChange: () => {},
		open: false
	};

	constructor(props) {
		super(props);
		this.state = {
			open: props.open || false,
			value: props.value || ''
		};
	}

	componentWillReceiveProps(nextProps) {
		const { open, value } = this.props;

		if (value !== nextProps.value && nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value });
		}
		if (open !== nextProps.open && nextProps.open !== this.state.open) {
			this.setState({ open: nextProps.open });
		}
	}

	toggleDialog = (open: boolean, cb: () => void) => this.setState({ open }, cb);

	openDialog = (cb?: () => void) => this.toggleDialog(true, cb);

	closeDialog = (cb?: () => void) => this.toggleDialog(false, cb);

	handleDialogClose = () => this.closeDialog();

	handleCancelClick = () => {
		this.props.beforeCancel();
		this.closeDialog(this.props.onCancel);
	};

	handleApplyClick = () => {
		this.props.beforeApply();
		this.closeDialog(this.props.onApply);
	};

	handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		this.props.beforeChange(value);
		this.setState({ value }, () => {
			this.props.onChange(this.state.value);
		});
	};

	render() {
		const { mode } = this.props;
		const { value } = this.state;
		const isChangeMode = mode === 'change';

		return (
			<Dialog
				open={this.state.open}
				onClose={this.handleDialogClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					{isChangeMode ? 'Change your name' : 'Set your name'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{isChangeMode
							? 'This is how other players will see you in the game.'
							: 'If you want to join a game you must specify your name.'}
						It would be even better if you specify your surname too.
					</DialogContentText>
					<TextField
						autoFocus
						fullWidth
						id="name"
						label="Your name and surname"
						margin="dense"
						onChange={this.handleNameChange}
						value={value}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={this.handleCancelClick} color="primary">
						Cancel
					</Button>
					<Button onClick={this.handleApplyClick} color="primary">
						Apply
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default connect(
	({ player }: RootState): AuthDialogProps => ({
		mode: player.id ? 'change' : 'set',
		value: player.name
	})
)(AuthDialog);
