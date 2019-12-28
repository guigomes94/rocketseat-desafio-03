import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.status(200).json(plans);
  }

  async store(req, res) {
    const { title, duration, price } = req.body;

    const planExists = await Plan.findOne({
      where: { title },
    });

    if (planExists) {
      return res.status(400).json({ erro: 'Plan already exists.' });
    }

    const plan = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json(plan);
  }

  async update(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan doesnt exists!' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan doesnt exists!' });
    }

    await plan.destroy();

    return res.json(plan);
  }
}

export default new PlanController();
