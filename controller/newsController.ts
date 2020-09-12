import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';
import * as redis from 'redis';

import Helper from '../infra/helper';
import Exportfiles from '../infra/exportFiles'

class NewsController {

    async get(req, res) {
        try {
            let client = redis.createClient(6379, 'redis');
            await client.get('news', async function(error, reply){
                if(reply){
                    Helper.sendReponse(res, HttpStatus.OK, JSON.parse(reply));
                }else{
                    let result = await NewsService.get();
                    client.set('news', JSON.stringify(result));
                     client.expire('news', 20);
                    Helper.sendReponse(res, HttpStatus.OK, result);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    async getById(req, res) {
        try {
            const _id = req.params.id;
            let result = await NewsService.getById(_id)
            Helper.sendReponse(res, HttpStatus.OK, result)

        } catch (error) {
            console.error(error);
        }
    }

    async exportToCsv(req, res){
        try {
            let response = await NewsService.get();
            let filename = Exportfiles.tocsv(response);
            Helper.sendReponse(res, HttpStatus.OK, req.get('host') + "/exports/" + filename);
        } catch (error) {
            console.error(error);
        }
    }
    async create(req, res) {
        try {
            let vm = req.body;
            await NewsService.create(vm);
        } catch (error) {
            console.error(error);
        }
    }

    async update(req, res) {
        try {
            const _id = req.params.id;
            let vm = req.body;
            await NewsService.update(_id, vm)
            Helper.sendReponse(res, HttpStatus.OK, `${vm.title} foi atualizada com sucesso!`);
        } catch (error) {
            console.error(error);
        }
    }

    async delete(req, res) {
        try {
            const _id = req.params.id;
            await NewsService.delete(_id)
            Helper.sendReponse(res, HttpStatus.OK, `Noticia deletada com sucesso!`);
        } catch (error) {
            console.error(error);
        }
    }

}

export default new NewsController();