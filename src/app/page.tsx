"use client";

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Home() {

    interface tasks {
        code: string,
        message: string,
        checked: boolean
    }

    // Menu Right Click
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Modal Edit
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    const [editDataCode, setEditDataCode] = React.useState<string>('important');
    const [editDataType, setEditDataType] = React.useState<string>('important');
    const [editData, setEditData] = React.useState<string>("");
    const [newData, setNewData] = React.useState<string>("");

    const [importants, setImportants] = React.useState<tasks[]>([
        {
            code: "ABC4",
            message: "Write Your Essay!",
            checked: false
        },
        {
            code: "ABC5",
            message: "Feed your cat!",
            checked: false
        },
        {
            code: "ABC6",
            message: "Buy milk and cereals!",
            checked: true
        }
    ]);

    const [tasks , setTasks] = React.useState<tasks[]>([
        {
            code: "ABC1",
            message: "Do Laundry!",
            checked: false
        },
        {
            code: "ABC2",
            message: "Read Newspaper!",
            checked: false
        },
        {
            code: "ABC3",
            message: "Gym Excercise Day #20!",
            checked: true
        }
    ]);

    React.useEffect(() => {
        sortImportants();
        sortTasks();
    }, []);

    React.useEffect(() => {
        sortImportants();
    }, [importants]);

    React.useEffect(() => {
        sortTasks();
    }, [tasks]);

    const sortTasks = () => {
        // @ts-ignore
        const sortedTasks = [...tasks].sort((a, b) => b.checked - a.checked);
        setTasks(sortedTasks);
    }

    const sortImportants = () => {
        // @ts-ignore
        const sortedImportants = [...importants].sort((a, b) => b.checked - a.checked);
        setImportants(sortedImportants);
    }

    const toggleTask = (code: string, value: any) => {
        setTasks(tasks.map(item => (item.code === code ? { ...item, checked: !value } : item)));
    };

    const toggleImportant = (code: string, value: any) => {
        setImportants(importants.map(item => (item.code === code ? { ...item, checked: !value } : item)));
    };

    const addToImportant = (data: tasks) => {
        setImportants(importants => [...importants, data]);

        const removedTasks = tasks.filter(obj => obj.code !== data.code);
        setTasks(removedTasks);
    };

    const removeFromImportant = (data: tasks) => {
        setTasks(tasks => [...tasks, data]);

        const removedImportants = importants.filter(obj => obj.code !== data.code);
        setImportants(removedImportants);
    };

    const addNewTask = () => {
        setTasks(tasks => [...tasks, {
            code: Math.random().toString(36).substring(2, 10),
            message: newData,
            checked: false
        }]);
        setNewData("");
    };

    const editMessage = () => {
        if (editDataType === "important") {
            // @ts-ignore
            setImportants(importants.map(item => (item.code === editDataCode ? { ...item, message: editData } : item)));
        } else {
            // @ts-ignore
            setTasks(tasks.map(item => (item.code === editDataCode ? { ...item, message: editData } : item)));
        }
    }

    const deleteMessage = () => {
        if (editDataType === "important") {
            // @ts-ignore
            const removedImportants = importants.filter(obj => obj.code !== editDataCode);
            setImportants(removedImportants);
        } else {
            // @ts-ignore
            const removedTasks = tasks.filter(obj => obj.code !== editDataCode);
            setTasks(removedTasks);
        }
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className={'w-screen h-screen'}>
            <h3 className={'drop-shadow-sm text-slate-900 opacity-70 text-center text-4xl font-sans font-bold pb-2 pt-8'} style={{paddingLeft: '15px', paddingRight: '15px'}}>Tududu
                App</h3>
            <h6 className={'drop-shadow-sm text-slate-900 opacity-70 text-center text-2xl font-sans font-medium'} style={{paddingLeft: '15px', paddingRight: '15px'}}>Write What You
                Gonna Do Here! </h6>

            <div className="container sm:w-full md:w-2/5 mx-auto text-center mt-20 " style={{paddingLeft: '15px', paddingRight: '15px'}}>
                <div className="grid grid-cols-1 gap-4 mb-3">
                    <div>
                        <h4 className={'drop-shadow-sm text-slate-900 opacity-70 text-left text-2xl font-sans font-medium'}>Important</h4>
                    </div>
                </div>

                {
                    importants.map((important, index) => {
                        return (
                            <List key={index} className={'rounded-lg mx-auto w-full py-0 opacity-70 drop-shadow-sm mb-3'}
                                  sx={{textAlign: 'center', bgcolor: 'white'}}>
                                <ListItem
                                    className={'h-md'}
                                    secondaryAction={
                                        <>
                                            <IconButton
                                                edge="end"
                                                aria-label="options"
                                                onClick={() => removeFromImportant(important)}
                                            >
                                                <StarIcon/>
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="options"
                                                onClick={(event) => {handleClick(event); setEditDataCode(important.code); setEditDataType('important'); setEditData(important.message);}}
                                            >
                                                <MoreVertIcon/>
                                            </IconButton>
                                        </>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={important.checked}
                                                onChange={() => toggleImportant(important.code, important.checked)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText className={'font-semibold'} primary={important.message}/>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        );
                    })
                }
            </div>

            <div className="container sm:w-full md:w-2/5 mx-auto text-center mt-20 " style={{paddingLeft: '15px', paddingRight: '15px'}}>
                <div className="grid grid-cols-1 gap-4 mb-3">
                    <div>
                        <h4 className={'drop-shadow-sm text-slate-900 opacity-70 text-left text-2xl font-sans font-medium'}>Tasks</h4>
                    </div>
                </div>

                {
                    tasks.map((task, index) => {
                        // @ts-ignore
                        return (
                            <List key={index} className={'rounded-lg mx-auto w-full py-0 opacity-70 drop-shadow-sm mb-3'}
                                  sx={{textAlign: 'center', bgcolor: 'white'}}>
                                <ListItem
                                    className={'h-md'}
                                    secondaryAction={
                                        <>
                                            <IconButton
                                                edge="end"
                                                aria-label="options"
                                                onClick={() => addToImportant(task)}
                                            >
                                                <StarBorderIcon/>
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="options"
                                                onClick={(event) => {handleClick(event); setEditDataCode(task.code); setEditDataType('task'); setEditData(task.message);}}
                                            >
                                                <MoreVertIcon/>
                                            </IconButton>
                                        </>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={task.checked}
                                                onChange={() => toggleTask(task.code, task.checked)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText className={'font-semibold'} primary={task.message}/>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        );
                    })
                }
            </div>



            <div className="container sm:w-full md:w-2/5 mx-auto text-center mt-20" style={{paddingLeft: '15px', paddingRight: '15px'}}>
                <Divider className={'bg-white opacity-70 mb-3'} sx={{ height: 2, m: 0.5 }} orientation="horizontal" />

                <Paper
                    elevation={0}
                    className={'rounded-lg mx-auto w-full opacity-70 drop-shadow-sm bg-white'}
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >
                    <InputBase
                        defaultValue={newData}
                        onBlur={e => setNewData(e.target.value)}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="What do you need todo?"
                        inputProps={{ 'aria-label': 'add new todo' }}
                    />

                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton onClick={() => addNewTask()} disabled={newData.length <= 0} sx={{ p: '10px' }} aria-label="directions">
                        <AddCircleIcon />
                    </IconButton>
                </Paper>
                <br/>
                <br/>
            </div>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { handleClose(); handleOpenEditModal(); }}>Edit</MenuItem>
                <MenuItem onClick={() => { handleClose(); deleteMessage(); }}>Delete</MenuItem>
            </Menu>

            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Message
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            className={'w-full'}
                            id="edit-message"
                            label="Edit Message"
                            variant="outlined"
                            defaultValue={editData}
                            onBlur={e => setEditData(e.target.value)}
                        />
                        <Button onClick={() => { handleCloseEditModal(); editMessage(); }} disabled={editData.length <= 0} className={'w-full mt-3'} variant="contained">SUBMIT</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

