import { Router } from "https://deno.land/x/oak/mod.ts";
import * as controllers from "../controllers/index.controllers.ts";

const router = new Router();

router.get("/users", controllers.getUsers);
router.post("/users", controllers.createUser);
router.get("/users/:id", controllers.getUser);
router.delete("/users/:id", controllers.deleteUser);
router.put("/users/:id", controllers.updateUser);

export default router;
