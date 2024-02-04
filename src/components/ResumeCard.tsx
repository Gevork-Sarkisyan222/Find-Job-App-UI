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
import EditModal from '@mui/joy/Modal';

import ButtonJoy from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import InfoModal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitleJoy from '@mui/joy/DialogTitle';
import DialogContentJoy from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import DrawIcon from '@mui/icons-material/Draw';
import TextField from '@mui/material/TextField';
import BackArrow from '@mui/icons-material/KeyboardBackspace';

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

  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [openInfo, setOpenInfo] = React.useState<boolean>(false);

  const handleOpenEditModal = () => {
    setOpenEdit(true);
  };

  const handleOpenInfoModal = () => {
    setOpenInfo(true);
  };

  // edit section
  const [titleEdit, setTitleEdit] = React.useState('');
  const [fullNameEdit, setFullNameEdit] = React.useState('');
  const [professionEdit, setProfessionEdit] = React.useState('');
  const [educationEdit, setEducationEdit] = React.useState('');
  const [salaryEdit, setSalaryEdit] = React.useState('');
  const [emailEdit, setEmailEdit] = React.useState('');
  const [instagramEdit, setInstagramEdit] = React.useState('');
  const [facebookEdit, setFacebookEdit] = React.useState('');
  const [phoneNumberEdit, setPhoneNumberEdit] = React.useState('');
  const [descEdit, setDescEdit] = React.useState('');

  // const editResume = async () => {
  //   try {
  //     const data = {
  //       title: titleEdit,
  //       fullName: fullNameEdit,
  //       profession: professionEdit,
  //       education: educationEdit,
  //       salary: salaryEdit,
  //       // email: emailEdit,
  //       // instagram: instagramEdit,
  //       // facebook: facebookEdit,
  //       // phoneNumber: phoneNumberEdit,
  //       desc: descEdit,
  //     };
  //     const resume = await axios.patch(`/resume/edit/${_id}`, data);
  //     setRenderList(resume.data);
  //   } catch (err) {
  //     console.warn(err);
  //     alert('Не удалось изменить резьюме');
  //   }
  // };

  const editResume = async () => {
    try {
      const data: any = {};

      if (titleEdit !== '') data.title = titleEdit;
      if (fullNameEdit !== '') data.fullName = fullNameEdit;
      if (professionEdit !== '') data.profession = professionEdit;
      if (educationEdit !== '') data.education = educationEdit;
      if (salaryEdit !== '') data.salary = salaryEdit;
      if (descEdit !== '') data.data = salaryEdit;

      if (Object.keys(data).length === 0) {
        console.warn('Нет изменений для сохранения');
        return;
      }

      const resume = await axios.patch(`/resume/edit/${_id}`, data).then(() => {
        window.location.reload();
      });
      // setRenderList(resume.data);
    } catch (err) {
      console.warn(err);
      alert('Не удалось изменить резюме');
    }
  };

  return (
    <>
      {/* <InfoModal open={openInfo} onClose={() => setOpenInfo(false)}>
        <ModalDialog>
          <BackArrow onClick={() => setOpenInfo(false)} sx={{ cursor: 'pointer' }} />
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Почта</FormLabel>
                <Input onChange={(e) => setEmailEdit(e.target.value)} defaultValue={email} />
              </FormControl>
              <FormControl>
                <FormLabel>Инстаграм</FormLabel>
                <Input
                  onChange={(e) => setInstagramEdit(e.target.value)}
                  defaultValue={instagram}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Фейсбук</FormLabel>
                <Input onChange={(e) => setFacebookEdit(e.target.value)} defaultValue={facebook} />
              </FormControl>
              <FormControl>
                <FormLabel>Номер телефона</FormLabel>
                <Input
                  onChange={(e) => setPhoneNumberEdit(e.target.value)}
                  defaultValue={phoneNumber}
                />
              </FormControl>
              <FormLabel>Доп. Информация</FormLabel>
              <TextField
                id="filled-multiline-static"
                label="Напишите о вас"
                defaultValue={desc}
                multiline
                rows={4}
                variant="filled"
                required
                onChange={(e) => setDescEdit(e.target.value)}
              />
              <ButtonJoy onClick={editResume} type="submit">
                Сохранить часть
              </ButtonJoy>
            </Stack>
          </form>
        </ModalDialog>
      </InfoModal> */}
      {/* ======================== */}
      <EditModal open={openEdit} onClose={() => setOpenEdit(false)}>
        <ModalDialog>
          <DialogTitleJoy>Изменить резьюме</DialogTitleJoy>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Загаловок</FormLabel>
                <Input onChange={(e) => setTitleEdit(e.target.value)} defaultValue={title} />
              </FormControl>
              <FormControl>
                <FormLabel>Имя и Фамилия</FormLabel>
                <Input onChange={(e) => setFullNameEdit(e.target.value)} defaultValue={fullName} />
              </FormControl>
              <FormControl>
                <FormLabel>Профессия 💼</FormLabel>
                <Input
                  onChange={(e) => setProfessionEdit(e.target.value)}
                  defaultValue={profession}
                />
              </FormControl>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-around' }}>
                <FormControl>
                  <FormLabel>Образование 🎓</FormLabel>
                  <Input
                    sx={{ width: '148px' }}
                    onChange={(e) => setEducationEdit(e.target.value)}
                    defaultValue={education}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Зарплата 💸</FormLabel>
                  <Input
                    sx={{ width: '100px' }}
                    onChange={(e) => setSalaryEdit(e.target.value)}
                    defaultValue={salary}
                  />
                </FormControl>
              </div>
              {/* <ButtonJoy startDecorator={<DrawIcon />} onClick={handleOpenInfoModal}>
                Доп информация
              </ButtonJoy> */}
              <FormLabel>Доп. Информация</FormLabel>
              <TextField
                id="filled-multiline-static"
                label="Напишите о вас"
                defaultValue={desc}
                multiline
                rows={4}
                variant="filled"
                required
                onChange={(e) => setDescEdit(e.target.value)}
              />
              <ButtonJoy onClick={editResume} type="submit">
                Сохранить
              </ButtonJoy>
            </Stack>
          </form>
        </ModalDialog>
      </EditModal>
      {/* ======================= */}
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
            <EditIcon onClick={handleOpenEditModal} sx={{ color: '#1976d2', cursor: 'pointer' }} />
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
