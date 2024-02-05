import React from 'react';

type props = {
  search: string;
};

const NotFoundValue: React.FC<props> = ({ search }) => {
  return (
    <div>
      <h1 style={{ color: 'red' }}>
        Резьюме пустые либо по вашему запросу <span style={{ color: 'blue' }}>"{search}"</span>{' '}
        нечего не найдено
      </h1>
    </div>
  );
};

export default NotFoundValue;
