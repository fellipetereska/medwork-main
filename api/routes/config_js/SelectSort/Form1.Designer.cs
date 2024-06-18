namespace SelectSort
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.button1 = new System.Windows.Forms.Button();
            this.lbxOriginal = new System.Windows.Forms.ListBox();
            this.lbxOrdenado = new System.Windows.Forms.ListBox();
            this.SuspendLayout();
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(57, 25);
            this.button1.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(177, 35);
            this.button1.TabIndex = 0;
            this.button1.Text = "button1";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // lbxOriginal
            // 
            this.lbxOriginal.FormattingEnabled = true;
            this.lbxOriginal.ItemHeight = 20;
            this.lbxOriginal.Location = new System.Drawing.Point(57, 70);
            this.lbxOriginal.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.lbxOriginal.Name = "lbxOriginal";
            this.lbxOriginal.Size = new System.Drawing.Size(83, 224);
            this.lbxOriginal.TabIndex = 1;
            // 
            // lbxOrdenado
            // 
            this.lbxOrdenado.FormattingEnabled = true;
            this.lbxOrdenado.ItemHeight = 20;
            this.lbxOrdenado.Location = new System.Drawing.Point(151, 70);
            this.lbxOrdenado.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.lbxOrdenado.Name = "lbxOrdenado";
            this.lbxOrdenado.Size = new System.Drawing.Size(83, 224);
            this.lbxOrdenado.TabIndex = 2;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(512, 353);
            this.Controls.Add(this.lbxOrdenado);
            this.Controls.Add(this.lbxOriginal);
            this.Controls.Add(this.button1);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.ListBox lbxOriginal;
        private System.Windows.Forms.ListBox lbxOrdenado;
    }
}

