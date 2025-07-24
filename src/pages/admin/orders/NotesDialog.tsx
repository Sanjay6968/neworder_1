import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

interface NotesDialogProps {
    open: boolean;
    onClose: () => void;
    notes: any[];
}

const NotesDialog: React.FC<NotesDialogProps> = ({ open, onClose, notes = [] }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Status Notes</DialogTitle>
            <DialogContent>
                {notes.length > 0 ? (
                    <List>
                        {notes.map((statusNote, statusIndex) => (
                            <div key={statusIndex}>
                                <Typography variant="h6" gutterBottom>
                                    {statusNote.status}
                                </Typography>
                                <List disablePadding>
                                    {statusNote.notes.map((note: any, noteIndex: number) => (
                                        <ListItem key={noteIndex} alignItems="flex-start">
                                            <ListItemText
                                                primary={`Note: ${note.note}`}
                                                secondary={`Created At: ${new Date(note.createdAt).toLocaleString()}${
                                                    note.courierName ? `, Courier: ${note.courierName}` : ''
                                                }${note.trackingId ? `, Tracking ID: ${note.trackingId}` : ''}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                {statusIndex < notes.length - 1 && <Divider variant="middle" />}
                            </div>
                        ))}
                    </List>
                ) : (
                    <Typography>No notes available</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NotesDialog;
