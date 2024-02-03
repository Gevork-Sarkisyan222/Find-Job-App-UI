import React, { useState, useEffect } from 'react';
import ResumeCard from './ResumeCard';
import Button from '@mui/material/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ConnectMediaButton from '@mui/joy/Button';
import { Typography } from '@mui/material';
import MediaModal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';
import DownIcon from '@mui/icons-material/South';
import { isAuthenticated } from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import axios from '../axios';

interface ResumeProps {
  _id: string;
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

function Home() {
  const isAuthenticatedUser = useSelector(isAuthenticated);
  const [resumes, setResumes] = useState<ResumeProps[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const smallDevice = useMediaQuery('(max-width:600px)');
  const [renderList, setRenderList] = useState([]);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: smallDevice ? 300 : 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  useEffect(() => {
    const getAllResumes = async () => {
      const res = await axios.get('resume/lists');
      setResumes(res?.data);
      console.log(res?.data);
    };

    getAllResumes();
  }, [renderList]);

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleOpenResumeModal = () => {
    setOpen(true);
  };

  // snack bar
  const { enqueueSnackbar } = useSnackbar();

  const handleShowSnackBar = (variant: VariantType) => {
    enqueueSnackbar('Для начало пройдите регестрацию', { variant });
  };

  // forms
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [residence, setResidence] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [education, setEducation] = useState('');
  const [salary, setSalary] = useState('');
  const [desc, setDesc] = useState('');
  // =====================================

  const createResume = async () => {
    try {
      const data = {
        title,
        fullName,
        residence,
        email,
        instagram,
        facebook,
        phoneNumber,
        profession,
        education,
        salary,
        desc,
      };
      const res = await axios.post('resume/create', data);
      window.location.reload();
      return res.data;
    } catch (err) {
      console.warn(err);
      alert('Не удалось создать резьюме');
    }
  };

  return (
    <>
      {/* media connection modal */}
      <MediaModal
        sx={{ zIndex: 2 }}
        keepMounted
        open={openModal}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Укажите
          </Typography>
          <FormLabel>Почта</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} type="email" />

          <FormLabel>Инстаграм</FormLabel>
          <Input onChange={(e) => setInstagram(e.target.value)} />

          <FormLabel>Фейсбук</FormLabel>
          <Input onChange={(e) => setFacebook(e.target.value)} />

          <FormLabel>Номер телефона</FormLabel>
          <Input onChange={(e) => setPhoneNumber(e.target.value)} />
        </Box>
      </MediaModal>
      {/* ================= */}
      <Modal sx={{ zIndex: 1 }} open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Написать разьюме</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <div
          // onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          // event.preventDefault();
          // setOpen(false);
          // }}
          >
            <Stack spacing={2}>
              <FormLabel>Заголовок</FormLabel>
              <Input onChange={(e) => setTitle(e.target.value)} required />
              <FormControl>
                <FormLabel>Имя и Фамилия</FormLabel>
                <Input onChange={(e) => setFullName(e.target.value)} required />
              </FormControl>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexDirection: smallDevice ? 'column' : 'row',
                }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel>Местопроживание</FormLabel>
                  <Input onChange={(e) => setResidence(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel>Указать Связь</FormLabel>
                  <ConnectMediaButton onClick={handleOpen} sx={{ width: '160px' }}>
                    Связь
                  </ConnectMediaButton>
                  {/* <Input  required /> */}
                </div>
                {!smallDevice && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Возраст</FormLabel>
                    <Input type="number" />
                  </div>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexDirection: smallDevice ? 'column' : 'row',
                }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel>Профессия</FormLabel>
                  <Input onChange={(e) => setProfession(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel>Образование</FormLabel>
                  <Input onChange={(e) => setEducation(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel>Зарплата</FormLabel>
                  <Input onChange={(e) => setSalary(e.target.value)} required />
                </div>
              </div>
              <FormLabel>Доп. Информация</FormLabel>
              <TextField
                id="filled-multiline-static"
                label="Напишите о вас"
                multiline
                rows={4}
                variant="filled"
                required
                onChange={(e) => setDesc(e.target.value)}
              />
              <FormControl></FormControl>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                <Button onClick={createResume} sx={{ width: '150px' }} variant="text">
                  Создать
                </Button>
              </div>
            </Stack>
          </div>
        </ModalDialog>
      </Modal>
      <div className="Container">
        <h2>Найти Работу</h2>
        <Button
          onClick={isAuthenticatedUser ? handleOpenResumeModal : () => handleShowSnackBar('error')}
          variant="contained">
          Написать резьюме
        </Button>
        <br />
        <DownIcon
          sx={{
            color: '#1976d2',
            marginTop: '30px',
            width: '80px',
            height: '80px',
            animation: 'moveUpDown 2s ease-in-out infinite',
          }}
        />
        <div className="wrapper">
          <div className="resume-card">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume?._id}
                setRenderList={setRenderList}
                _id={resume?._id}
                title={resume?.title}
                fullName={resume?.fullName}
                residence={resume?.residence}
                email={resume?.email}
                profession={resume?.profession}
                education={resume?.education}
                desc={resume?.desc}
                salary={resume?.salary}
                createdAt={resume?.createdAt}
                instagram={resume?.instagram}
                facebook={resume?.facebook}
                phoneNumber={resume?.phoneNumber}
                userEmail={resume?.userEmail}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
