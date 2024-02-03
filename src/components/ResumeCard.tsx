import React, { useState, Dispatch, SetStateAction } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { format, register } from 'timeago.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import ru from 'timeago.js/lib/lang/ru';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '.././axios';

interface ResumeProps {
  _id: string;
  setRenderList: any;
  title: string;
  fullName: string;
  residence: string;
  email: string;
  profession: string;
  education: string;
  desc: string;
  salary: string;
  createdAt: string;
  instagram: string;
  facebook: string;
  phoneNumber: string;
  userEmail: string;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const ResumeCard: React.FC<ResumeProps> = ({
  _id,
  setRenderList,
  title,
  fullName,
  residence,
  email,
  profession,
  education,
  desc,
  salary,
  createdAt,
  instagram,
  facebook,
  phoneNumber,
  userEmail,
}) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openConnection, setOpenConnection] = React.useState(false);

  const handleClickOpenConnection = () => {
    setOpenConnection(true);
  };

  const handleCloseConnection = () => {
    setOpenConnection(false);
  };

  register('ru', ru);

  const date = new Date(createdAt);
  const formattedDate = format(date, 'ru');

  const deleteResume = async () => {
    try {
      const deleteMessage = window.confirm('Вы действительно хотите удалить резьюме?');
      if (deleteMessage) {
        const resume = await axios.delete(`resume/delete/${_id}`);
        setRenderList(resume.data);
      }
    } catch (err) {
      console.warn(err);
      alert('Не удалось удалить резьюме');
    }
  };

  const editResume = async () => {
    try {
      const data = {};
      const resume = await axios.patch(`/resume/edit/${_id}`, data);
      return resume.data;
    } catch (err) {
      console.warn(err);
      alert('Не удалось изменить резьюме');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Доп. Информация о резьюме
        </DialogTitle>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Местопроживание: {residence}
        </DialogTitle>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Оброзавание {education ? education : <h3>не указан</h3>}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
      {/* connect with resume user */}
      <Dialog
        open={openConnection}
        onClose={handleCloseConnection}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Связь
        </DialogTitle>
        <DialogContent>
          <h3>Почта:</h3>
          <Typography variant="body2" color="text.secondary">
            {email ? email : <h4>не указан</h4>}
          </Typography>
          <h3>Инстаграм:</h3>
          <Typography variant="body2" color="text.secondary">
            {instagram ? (
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                {instagram}
              </a>
            ) : (
              <h4>не указан</h4>
            )}
          </Typography>
          <h3>Фейсбук:</h3>
          <Typography variant="body2" color="text.secondary">
            {facebook ? (
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                {facebook}
              </a>
            ) : (
              <h4>не указан</h4>
            )}
          </Typography>
          <h3>Номер телефона:</h3>
          <Typography variant="body2" color="text.secondary">
            {phoneNumber ? phoneNumber : <h4>не указан</h4>}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseConnection}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
      {/* ================ */}
      <Card sx={{ maxWidth: 345 }}>
        {currentUser?.email === userEmail && (
          <div style={{ display: 'flex', gap: '7px', justifyContent: 'flex-end' }}>
            <EditIcon sx={{ color: '#1976d2', cursor: 'pointer' }} />
            <DeleteIcon onClick={deleteResume} sx={{ color: 'red', cursor: 'pointer' }} />
          </div>
        )}
        <h4>{formattedDate}</h4>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <h2>{fullName}</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button onClick={handleClickOpen} size="small">
              читать описание
            </Button>
            <Button onClick={handleClickOpenConnection} size="small">
              связь
            </Button>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">Профессия: {profession}</Button>
          <Button size="small">ЗП: {salary}</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ResumeCard;
