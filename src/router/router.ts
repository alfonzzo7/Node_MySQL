import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    const query = `SELECT * FROM heroes`;

    MySQL.query(query, (error: any, heroes: Object[]) => {
        if (error) {
            res.status(500).json({
                ok: false,
                error: error
            });
        } else {
            res.json({
                ok: true,
                heroes: heroes
            });
        }
    });


});

router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    const escapeId = MySQL.instance.cnn.escape(id);

    const query = `SELECT * FROM heroes WHERE id=${escapeId}`;

    MySQL.query(query, (error: any, heroe: Object[]) => {
        if (error) {
            res.status(500).json({
                ok: false,
                error: error
            });
        } else {
            res.json({
                ok: true,
                heroe: heroe[0]
            });
        }
    });

});

export default router;