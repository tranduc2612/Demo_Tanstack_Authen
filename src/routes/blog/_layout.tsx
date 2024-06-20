import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/_layout')({
  component: () => <div>Hello /blog/_layout!</div>
})