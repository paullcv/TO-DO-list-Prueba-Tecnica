<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
    
        if ($tasks->isEmpty()) {
            return $this->jsonResponse('No tasks found', null, 200);
        }
    
        return $this->jsonResponse('Tasks retrieved successfully', $tasks, 200);
    }
    
    public function store(Request $request)
    {
        $validator = $this->validateTask($request);

        if ($validator->fails()) {
            return $this->jsonResponse('Validation errors', $validator->errors(), 400);
        }

        $task = Task::create($request->all());

        return $this->jsonResponse('Task created successfully', $task, 201);
    }


    public function show($id)
    {
        $task = Task::find($id);
    
        if (!$task) {
            return $this->jsonResponse('Task not found', null, 404);
        }
    
        return $this->jsonResponse('Task retrieved successfully', $task, 200);
    }
    

    public function update(Request $request, $id)
    {
        $task = Task::find($id);
    
        if (!$task) {
            return $this->jsonResponse('Task not found', null, 404);
        }
    
        $validator = $this->validateTask($request);
    
        if ($validator->fails()) {
            return $this->jsonResponse('Validation errors', $validator->errors(), 400);
        }
    
        $task->update($request->all());
    
        return $this->jsonResponse('Task updated successfully', $task, 200);
    }
    

    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();
    
            return $this->jsonResponse('Task deleted successfully', null, 200);
        } catch (\Exception $e) {
            return $this->jsonResponse('Error deleting task', $e->getMessage(), 500);
        }
    }
    

    private function validateTask(Request $request)
    {
        return Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'completed' => 'required|boolean',
        ]);
    }

    private function jsonResponse($message, $data = null, $status = 200)
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
            'status' => $status,
        ], $status);
    }
}
