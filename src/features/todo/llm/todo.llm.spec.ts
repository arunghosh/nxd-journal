import { expect, it } from "@jest/globals";
import * as llm from "./todo.llm";
import { TodoItem, TodoItemStatus } from "../models";

function createPendingTodoObject(text: string): TodoItem {
  return {
    id: 1,
    text,
    status: TodoItemStatus.PENDING,
    addedAt: new Date(),
    category: "shopping"
  };
}

const USER_INPUTS = {
  car: {
    service: "I need to give car for service.",
  },
  purchase: {
    laptop: "Need to buy a laptop for home",
    bag: "I need to buy a bag for son",
    vegetables: "I need to buy some vegetables",
    groceries: "I need to buy some groceries",
  },
  purchased: {
    laptop: "I bought a laptop today from Amazon for home",
    vegetableAndGroceries: "I bought some vegetables and groceries today",
  },
  treatment: {
    findDoctor: "Need to find a good Ayurvedic doctor for back pain by tomorrow.",
  },
};

const TASKS = {
  purchase: {
    laptop: "Have to buy a laptop for home",
    vegetables: "I need to buy some vegetables",
    groceries: "I need buy some groceries",
    tshirt: "buy a t-shirt from Decathlon.",
  },
  treatment: {
    backpain: "I need to get a treatment for my back pain.",
  },
};

describe("getNewTodos", () => {
  it("1# should return a new item when input contains a purchase request", async () => {
    const newTodos = await llm.getNewTodos(USER_INPUTS.purchase.laptop, []);
    expect(newTodos.length).toBe(1);
    expect(newTodos[0].text).toContain("laptop");
  });

  it("2# should return new item when input is to service vehicle", async () => {
    const newTodos = await llm.getNewTodos(USER_INPUTS.car.service, []);
    expect(newTodos.length).toBe(1);
    expect(newTodos[0].text).toContain("car");
  });

  it("3# should return mutiple items when prompt has multiple items", async () => {
    const input = [USER_INPUTS.purchase.bag, USER_INPUTS.purchase.laptop].join(
      "."
    );
    const newTodos = await llm.getNewTodos(input, []);
    expect(newTodos.length).toBe(2);
    const joinedTodo = newTodos.map(t => t.text).join(".");
    expect(joinedTodo).toContain("laptop");
    expect(joinedTodo).toContain("bag");
  });

  it("4# should return new items that is different from the existing pending item", async () => {
    const newTodos = await llm.getNewTodos(USER_INPUTS.purchase.bag, [
      createPendingTodoObject(USER_INPUTS.purchase.laptop),
    ]);
    expect(newTodos.length).toBe(1);
    expect(newTodos[0].text).toContain("bag");
  });

  it.skip("5# should NOT return any items if the text contains already existing task", async () => {
    const newTodos = await llm.getNewTodos(USER_INPUTS.purchase.laptop, [
      createPendingTodoObject(USER_INPUTS.purchase.laptop),
    ]);
    expect(newTodos.length).toBe(0);
  });

  it("6# should NOT return any items if the text contains only completed task", async () => {
    const newTodos = await llm.getNewTodos(USER_INPUTS.purchased.laptop, []);
    expect(newTodos.length).toBe(0);
  });

  it("7# should NOT return any items if the text contains only completed task", async () => {
    const newTodos = await llm.getNewTodos(
      USER_INPUTS.purchased.vegetableAndGroceries,
      [createPendingTodoObject(TASKS.purchase.vegetables)]
    );
    expect(newTodos.length).toBe(0);
  });

  it("8# should NOT return any items if the text contains only completed task", async () => {
    const newTodos = await llm.getNewTodos(
      "I did an AI presentation in company.",
      [
        createPendingTodoObject(TASKS.purchase.vegetables),
        createPendingTodoObject(TASKS.purchase.groceries),
        createPendingTodoObject(
          "I have to take a presentation for company on AI"
        ),
      ]
    );
    expect(newTodos.length).toBe(0);
  });
});

describe("getCompletedTodos", () => {
  it("1# should return completed tasks", async () => {
    const completedTodos = await llm.getCompletedTodos(
      USER_INPUTS.purchased.laptop,
      [createPendingTodoObject(TASKS.purchase.laptop)]
    );
    expect(completedTodos.length).toBe(1);
    expect(completedTodos[0]).toContain(TASKS.purchase.laptop);
  });

  it("2# should not complete tasks that are still pending", async () => {
    const completedTodos = await llm.getCompletedTodos(
      USER_INPUTS.purchase.vegetables,
      [createPendingTodoObject(TASKS.purchase.vegetables)]
    );
    expect(completedTodos.length).toBe(0);
  });

  it("3# should not complete tasks if text contains another pending task", async () => {
    const completedTodos = await llm.getCompletedTodos(
      USER_INPUTS.purchase.groceries,
      [createPendingTodoObject(TASKS.purchase.tshirt)]
    );
    expect(completedTodos.length).toBe(0);
  });

  it("4# should not complete tasks if text contains another pending task", async () => {
    const completedTodos = await llm.getCompletedTodos(
      USER_INPUTS.treatment.findDoctor,
      [createPendingTodoObject(TASKS.treatment.backpain)]
    );
    expect(completedTodos.length).toBe(0);
  });

  it.skip("5# should complete multiple tasks if text conveyed multiple completed items", async () => {
    const completedTodos = await llm.getCompletedTodos(
      USER_INPUTS.purchased.vegetableAndGroceries,
      [
        createPendingTodoObject(TASKS.purchase.vegetables),
        createPendingTodoObject(TASKS.purchase.groceries),
      ]
    );
    expect(completedTodos.length).toBe(2);
  });

  it("6# should not complete tasks if text conveyed is a new task", async () => {
    const completedTodos = await llm.getCompletedTodos(
      "Have to buy a corner shelf hanging.",
      [
        createPendingTodoObject("Task 74"),
        createPendingTodoObject("Need to prepare for the AI session."),
        createPendingTodoObject("I need to service the Aquaguard."),
      ]
    );
    expect(completedTodos.length).toBe(0);
  });
});
