import * as React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import IconAccountCircle from '@material-ui/icons/AccountCircle';
import IconCreate from '@material-ui/icons/Create';
import IconForward from '@material-ui/icons/Forward';

import { RootState } from '@store';
import { PlayerState } from '@store/reducers/player';

import './Header.scss';

export type HeaderProps = PlayerState & {};

type HeaderState = {
	menuAnchorEl: HTMLElement;
};

class Header extends React.Component<HeaderProps, HeaderState> {
	state = {
		menuAnchorEl: null
	};

	handleMenu = (event: React.SyntheticEvent<HTMLElement>) => {
		this.setState({ menuAnchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ menuAnchorEl: null });
	};

	handleNameClick = () => {
		const { id } = this.props;
	};

	render() {
		const { id, name } = this.props;
		const { menuAnchorEl } = this.state;
		const open = Boolean(menuAnchorEl);

		const nameMenuItem = (
			<MenuItem onClick={this.handleNameClick}>
				<ListItemIcon>{id ? <IconCreate /> : <IconForward />}</ListItemIcon>
				<ListItemText inset primary={id ? name : 'Set Name'} />
			</MenuItem>
		);

		return (
			<AppBar className="tf__app-bar" position="static">
				<Toolbar>
					<Typography
						className="tf__app-bar__typo"
						variant="h6"
						color="inherit"
					>
						Three Facts
					</Typography>
					<div>
						<IconButton
							aria-owns={open ? 'menu-appbar' : undefined}
							aria-haspopup="true"
							onClick={this.handleMenu}
							color="inherit"
						>
							<IconAccountCircle />
						</IconButton>

						<Menu
							id="menu-appbar"
							anchorEl={menuAnchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={open}
							onClose={this.handleClose}
						>
							{id ? (
								<Tooltip title="Change Name" placement="left">
									{nameMenuItem}
								</Tooltip>
							) : (
								nameMenuItem
							)}
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default connect(({ player }: RootState) => ({ ...player }))(Header);
