import { z } from "zod";

/* Exercises */
export const exerciseSchema = z.object({
    _id: z.string(),
    name: z.string()
});

export type ExerciseT = z.infer<typeof exerciseSchema>;
export type DraftExerciseT = Omit<ExerciseT, '_id'>;
//export type DraftExerciseT = Pick<ExerciseT, 'name'>;

export const exercisesSchema = z.array(
    exerciseSchema.pick({
        _id: true,
        name: true
    })
)


// Login
export const loginSchema = z.object({
    email: z.string(),
    pass: z.string()
})


export type LoginT = z.infer<typeof loginSchema>;

// Routines
export const routineSchema = z.object({
    _id: z.string(),
    name: z.string(),
    exercises: z.optional(z.array(
        z.object({
            exerciseId: exerciseSchema.pick({
                _id: true,
                name: true
            }),
            series: z.number(),
            reps: z.number(),
            weight: z.number(),
        })
    )),
    createdBy: z.string()
})

export type RoutineT = z.infer<typeof routineSchema>;
export type DraftRoutineT = {
    name: string;
    exercises: {
        exerciseId: string;
        series: number,
        reps: number,
        weight: number,
    }[]
}

export const routinesSchema = z.array(
    routineSchema
)

// user
export const userSchema = z.object({
    _id:z.string(),
    name:z.string(),
    email:z.string()
})

export type UserT = z.infer<typeof userSchema>;