import React, {useEffect} from 'react';

const notification: React.CSSProperties = {
	backgroundColor: '#111111',
	color: 'white',
	fontFamily: 'Arial, Helvetica, sans-serif',
	display: 'inline-flex',
	padding: '8px 14px',
	borderRadius: 4,
	fontSize: 15,
	border: '0.25px solid rgba(255, 255, 255, 0.1)',
	boxShadow: '0 2px 3px rgba(0, 0, 0, 1)',
	marginTop: 3,
	marginBottom: 3,
	alignItems: 'center',
};

export const Notification: React.FC<{
	children: React.ReactNode;
	created: number;
	duration: number;
	id: string;
	onRemove: (id: string) => void;
}> = ({children, id, duration, created, onRemove}) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			onRemove(id);
		}, duration - (Date.now() - created));

		return () => {
			clearTimeout(timeout);
		};
	}, [created, duration, id, onRemove]);

	return <div style={notification}>{children}</div>;
};
