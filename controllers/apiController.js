const Practice = require('../models/practice').Practice;
const Technology = require('../models/technology').Technology;

const DEFAULT_PAGE = 1;
const DEFAULT_PER = 5;
const SELECT = '-_id -__v';

const apiController = () => {
  const getPractices = (req, res, next) => {
    Practice.find({}, SELECT, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.send(results);
      }
    });
  };

  const getPracticesById = (req, res, next) => {
    const query = { id: req.params.practice_id };
    Practice.find(query, SELECT, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.send(results);
      }
    });
  };

  const getTechnologies = (req, res, next) => {
    const per = +req.query.per || DEFAULT_PER;
    const page = +req.query.page || DEFAULT_PAGE;
    const query = { practice_id: req.params.practice_id };
    const options = {
      select: SELECT,
      offset: (page - 1) * per,
      limit: per,
    };

    Technology.paginate(query, options, (err, data) => {
      if (err) {
        return next(err);
      }
      if (!data || data.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(data.docs);
      }
    });
  };

  const getTechnologiesById = (req, res, next) => {
    const query = {
      practice_id: req.params.practice_id,
      id: req.params.technology_id
    };

    Technology.find(query, SELECT, (err, data) => {
      if (err) {
        next(err);
      }
      if (!data || data.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(data);
      }
    });
  };

  return {
    getTechnologiesById,
    getTechnologies,
    getPractices,
    getPracticesById,
  };
};

module.exports = apiController;
