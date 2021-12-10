router.get('/', withAuth, (req, res) => {
    Flashcard.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'question', 'answer'],
      include: [
        {
          model: Category,
          attributes: ['id', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
  
          attributes: ['username'],
        },
      ],
    })
      .then(dbFlashcardData => {
        const flashcards = dbFlashcardData.map(flashcard =>
          flashcard.get({ plain: true })
        );
        res.render('dashboard', { flashcards, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });