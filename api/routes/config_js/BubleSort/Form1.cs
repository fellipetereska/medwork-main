using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace OrdenarVetor1
{
    public partial class Form1 : Form
    {
        int[] dados = new int[10];
        public Form1()
        {
            InitializeComponent();
        }
        // Método de Ordenação Bolha (Bubble Sort)
        private void button1_Click(object sender, EventArgs e)
        {
            dados[0] = 5;
            dados[1] = 2;
            dados[2] = 4;
            dados[3] = 7;
            dados[4] = 10;
            dados[5] = 3;
            dados[6] = 6;
            dados[7] = 9;
            dados[8] = 1;
            dados[9] = 8;
            int aux;

            for (int i = dados.Length - 1; i > 0; i--)
            {
                for (int x = 0; x < i; x++)
                {
                    if (dados[x] > dados[x + 1])
                    { 
                        aux          = dados[x];
                        dados[x]     = dados[x + 1];
                        dados[x + 1] = aux;
                    }                        
                }
            }

            for (int x = 0; x < dados.Length; x++)
            {
                listBox1.Items.Add(dados[x].ToString());
            }

            
        }
    }
}
