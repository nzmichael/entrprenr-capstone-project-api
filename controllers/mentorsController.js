const db = require('../db');

exports.search = (req, res) => {
    const { specialty, industries, name } = req.query;
    
    let query = 'SELECT * FROM mentors WHERE 1=1';
    let params = [];

    if (specialty) {
        query += ' AND specialty = ?';
        params.push(specialty);
    }

    if (industries) {
        query += ' AND FIND_IN_SET(?, industries) > 0';
        params.push(industries);
    }

    if (name) {
        query += ' AND name LIKE ?';
        params.push('%' + name + '%');
    }

    db.query(query, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error searching mentors');
            return;
        }

        res.json(result);
    });
};


exports.signupMentor = (req, res) => {
    const { name, email, specialty, bio, password } = req.body;

    db.query('INSERT INTO mentors (name, email, specialty, bio, password) VALUES (?, ?, ?, ?, ?)', [name, email, specialty, bio, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding mentor');
            return;
        }

        res.status(201).send('Mentor added successfully');
    });
};

exports.updateProfile = (req, res) => {
    const { id } = req.params;
    const { name, email, specialty, bio, profilePicture, coverPicture } = req.body;

    db.query('UPDATE mentors SET name=?, email=?, specialty=?, bio=?, profilePicture=?, coverPicture=? WHERE id=?', [name, email, specialty, bio, profilePicture, coverPicture, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating mentor profile');
            return;
        }

        res.status(200).send('Mentor profile updated successfully');
    });
};



exports.getAllMentors = (req, res) => {
    db.query('SELECT * FROM mentors', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching mentors');
            return;
        }

        res.json(result);
    });
};


exports.getFeaturedMentors = async (req, res) => {
    try {
      db.query('SELECT * FROM mentors WHERE is_featured = ?', [true], (err, result) => {
        if (err) {
          console.error('Error fetching featured mentors:', err);
          res.status(500).json({ error: 'Error fetching featured mentors' });
          return;
        }
        
        res.json(result);
      });
    } catch (error) {
      console.error('Error fetching featured mentors:', error);
      res.status(500).json({ error: 'Error fetching featured mentors' });
    }
};

exports.deleteMentorById = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM mentors WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting mentor:', err);
            res.status(500).json({ error: 'Error deleting mentor' });
            return;
        }

        res.json({ message: 'Mentor deleted successfully' });
    });
};
  

exports.getMentorById = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM mentors WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Invalid getting mentor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Mentor not found' });
            return;
        }

        res.json(result[0]);
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM mentors WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error signing in mentor');
            return;
        }

        if (result.length === 0) {
            res.status(401).send('Invalid email or password');
            return;
        }

        res.status(200).send('Mentor signed in successfully');
    });
};