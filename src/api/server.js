import { createServer, Model, Response } from 'miragejs';

export function makeServer() {
  return createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      server.create('employee', {
        id: 1,
        name: 'Jane Smith',
        position: 'Designer',
        email: 'jane.smith@example.com',
      });
      server.create('employee', {
        id: 2,
        name: 'John Doe',
        position: 'Developer',
        email: 'john.doe@example.com',
      });
      server.create('employee', {
        id: 3,
        name: 'Alice Johnson',
        position: 'Manager',
        email: 'alice.johnson@example.com',
      });
      server.create('employee', {
        id: 4,
        name: 'Bob Brown',
        position: 'Tester',
        email: 'bob.brown@example.com',
      });
      server.create('employee', {
        id: 5,
        name: 'Charlie Davis',
        position: 'Support',
        email: 'charlie.davis@example.com',
      });
      server.create('employee', {
        id: 6,
        name: 'Diane Evans',
        position: 'Analyst',
        email: 'diane.evans@example.com',
      });
      server.create('employee', {
        id: 7,
        name: 'Ethan Foster',
        position: 'Architect',
        email: 'ethan.foster@example.com',
      });
      server.create('employee', {
        id: 8,
        name: 'Fiona Green',
        position: 'Consultant',
        email: 'fiona.green@example.com',
      });
      server.create('employee', {
        id: 9,
        name: 'George Harris',
        position: 'Engineer',
        email: 'george.harris@example.com',
      });
      server.create('employee', {
        id: 10,
        name: 'Hannah Isaac',
        position: 'Technician',
        email: 'hannah.isaac@example.com',
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/employees', (schema) => {
        return schema.employees.all();
      });

      this.post('/employees', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newEmployee = schema.employees.create(attrs);
        return newEmployee.attrs;
      });

      this.patch('/employees/:id', (schema, request) => {
        try {
          const newAttrs = JSON.parse(request.requestBody);
          const id = request.params.id;
          const employee = schema.employees.find(id);
          console.log("id", employee);

          if (!employee) {
            console.error("Employee not found");
            return new Response(404, {}, { error: "Employee not found" });
          }

          console.log("Updating employee with ID:", id, "New attributes:", newAttrs);
          return employee.update(newAttrs);
        } catch (error) {
          console.error("Error updating employee:", error);
          return new Response(500, {}, { error: "Internal Server Error" });
        }
      });

      this.delete('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const employee = schema.employees.find(id);
        if (employee) {
          employee.destroy();
          return new Response(200, {}, { message: "Employee deleted successfully" });
        } else {
          return new Response(404, {}, { error: "Employee not found" });
        }
      });
    },
  });
}
