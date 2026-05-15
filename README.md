# Angular Interview Prep

A comprehensive Angular interview preparation guide with 25+ interview questions, detailed answers, code examples, and working implementations.

**Angular Version:** 21.2.2

## 📚 What's Included

### Interview Questions & Answers
Complete guide covering:
- **Fundamentals** - Angular basics, modules, standalone components
- **Components** - Lifecycle hooks, data binding, @Input/@Output
- **Services & Dependency Injection** - DI patterns and service creation
- **RxJS & Observables** - Observables, Subjects, operators (map, filter, switchMap, mergeMap)
- **Routing** - Route configuration, navigation, guards
- **Forms** - Template-driven and reactive forms
- **Change Detection** - Default vs OnPush strategy
- **Directives & Pipes** - Custom and built-in
- **Testing** - Unit testing components and services
- **Security & Best Practices** - Security patterns and coding standards

See [INTERVIEW_QUESTIONS.md](INTERVIEW_QUESTIONS.md) for complete Q&A.

### Working Code Examples
Practical implementations demonstrating:
- `src/app/services/user.service.example.ts` - Service with DI, Observables, BehaviorSubject
- `src/app/components/user-list-example/` - Component with OnPush change detection, async pipe, trackBy
- `src/app/guards/auth.guard.example.ts` - Route guards and authentication
- `src/app/shared/pipes/custom.pipes.example.ts` - Custom pipes (Reverse, SafeHtml, Truncate)
- `src/app/shared/directives/custom.directives.example.ts` - Custom directives (Highlight, Trim, LogClick, If)
- `src/app/interceptors/http.interceptors.example.ts` - HTTP interceptors (Auth, Error handling, Logging, Caching)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📖 Study Guide

1. **Start with basics:** Read [INTERVIEW_QUESTIONS.md](INTERVIEW_QUESTIONS.md) sections 1-3
2. **Review code examples:** Study the working implementations in `src/app/`
3. **Practice:** Try modifying the examples and running them
4. **Advanced topics:** Work through sections 4-10 of the interview guide
5. **Test your knowledge:** Use the testing examples to verify your understanding

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Key Topics Quick Links

- [Components & Lifecycle](INTERVIEW_QUESTIONS.md#components)
- [Services & DI](INTERVIEW_QUESTIONS.md#services--dependency-injection)
- [RxJS & Observables](INTERVIEW_QUESTIONS.md#rxjs--observables)
- [Routing & Guards](INTERVIEW_QUESTIONS.md#routing)
- [Forms](INTERVIEW_QUESTIONS.md#forms)
- [Performance Optimization](INTERVIEW_QUESTIONS.md#change-detection--performance)
- [Testing](INTERVIEW_QUESTIONS.md#testing)
- [Security](INTERVIEW_QUESTIONS.md#security--best-practices)

## 📝 Topics Covered

✅ Angular Fundamentals
✅ Component Architecture
✅ Dependency Injection
✅ RxJS & Reactive Programming
✅ Routing & Navigation
✅ Forms (Template-driven & Reactive)
✅ Change Detection Strategies
✅ Custom Directives & Pipes
✅ HTTP Interceptors
✅ Unit Testing
✅ Security Best Practices
✅ Performance Optimization

## 💡 Tips for Interview Preparation

1. **Understand the "why"** behind each concept, not just the "how"
2. **Practice coding** - implement examples from scratch
3. **Test your code** - use the test examples provided
4. **Know the patterns** - understand design patterns used in Angular
5. **Stay updated** - Angular is constantly evolving
6. **Ask clarifying questions** - in interviews, ask before coding

## Additional Resources

- [Angular Official Documentation](https://angular.dev)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [RxJS Official Guide](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

This project is open source and available for educational purposes.
