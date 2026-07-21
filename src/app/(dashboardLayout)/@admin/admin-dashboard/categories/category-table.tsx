"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { createCategory, updateCategory, deleteCategory } from "@/actions/admin.action";

export function CategoryTable({ categories }: { categories: any[] }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any | null>(null);
  const [name, setName] = useState("");

  const handleOpenDialog = (category?: any) => {
    if (category) {
      setCurrentCategory(category);
      setName(category.name);
    } else {
      setCurrentCategory(null);
      setName("");
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading("submit");
    try {
      let res;
      if (currentCategory) {
        res = await updateCategory(currentCategory.id, name);
      } else {
        res = await createCategory(name);
      }

      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success(`Category ${currentCategory ? "updated" : "created"}`);
        setIsDialogOpen(false);
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    setLoading(categoryId);
    try {
      const res = await deleteCategory(categoryId);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Category deleted");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/60">
      <div className="flex justify-between items-center">
        <div />
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" /> Create Category
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCategory ? "Edit Category" : "Create Category"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter category name"
                required 
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading === "submit"}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading === "submit"}>
                {loading === "submit" ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-mono text-xs text-zinc-500">{category.id}</TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0" 
                  onClick={() => handleOpenDialog(category)}
                  disabled={loading === category.id}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 ml-2" 
                  disabled={loading === category.id}
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-zinc-500">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
